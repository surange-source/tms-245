package scripting.event;

import auth.Auth;
import handling.channel.ChannelServer;
import org.apache.logging.log4j.Logger;
import scripting.AbstractScriptManager;
import scripting.DefaultScript;
import scripting.defaults.event.*;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @author Matze
 */
public final class EventScriptManager extends AbstractScriptManager {

    static final Logger log = AbstractScriptManager.log;
    private static final AtomicInteger runningInstanceMapId = new AtomicInteger(0);
    private final Map<String, EventEntry> events = new LinkedHashMap<>();
    private static final List<Class<? extends EventScript>> DEFAULT_SCRIPTS = new LinkedList<>();
    private final ChannelServer channelServer;

    static {
        // 菁英BOSS
        DEFAULT_SCRIPTS.add(EliteBoss.class);
        // 菁英BOSS獎勵(飛行)
        DEFAULT_SCRIPTS.add(EliteBossRewardFlyMob.class);
        // 培羅德
        DEFAULT_SCRIPTS.add(BossGiantVellud.class);
    }

    public EventScriptManager(ChannelServer cserv, String[] scripts) {
        channelServer = cserv;
        for (Class<? extends EventScript> cls : DEFAULT_SCRIPTS) {
            try {
                DefaultScript event = cls.getDeclaredConstructor().newInstance();
                EventManager em = new EventManager(channelServer, event, cls.getSimpleName());
                event.put(em);
                events.put(cls.getSimpleName(), new EventEntry(cls.getSimpleName(), event, em));
            } catch (Exception e) {
                log.error("Load default event error, event name: " + cls.getSimpleName(), e);
            }
        }
        for (String s : scripts) {
            if (s == null || s.isEmpty()) {
                continue;
            } else if (events.containsKey(s)) {
                try {
                    if (getScriptString("event/" + s + ".js") != null) {
                        log.warn("Event '" + s + "' has same name with default events, ignored.");
                    }
                } catch (IOException e) {
                }
                continue;
            }
            loadScript(cserv, s);
        }

        for (String s : Auth.getCloudEventScripts()) {
            if (events.containsKey(s)) {
                continue;
            }
            loadScript(cserv, s);
        }
    }

    private void loadScript(ChannelServer cserv, String event) {
        Invocable iv = getInvocable("event/" + event + ".js", null);
        if (iv != null) {
            EventManager em = new EventManager(cserv, iv, event);
            ((ScriptEngine) iv).put("em", em);
            events.put(event, new EventEntry(event, iv, em));
        }
    }

    public static int getNewInstanceMapId() {
        return runningInstanceMapId.addAndGet(1);
    }

    public EventManager getEventManager(String event) {
        EventEntry entry = events.get(event);
        return entry == null ? null : entry.em;
    }

    public final void init() {
        for (EventEntry eventEntry : events.values()) {
            try {
                eventEntry.iv.invokeFunction("init", (Object) null);
            } catch (final Exception ex) {
                log.error("Error initializing event: " + eventEntry.script, ex);
            }
        }
    }

    public final void cancel() {
        for (EventEntry entry : events.values()) {
            entry.em.cancel();
        }
    }

    /**
     * 根據事件名稱重載事件
     * 其他事件不會受到影響
     * @param eventName 事件名稱
     */
    public final void reload(String eventName) {
        EventEntry event = events.get(eventName);
        if (event != null) {
            if (event.iv instanceof DefaultScript) {
                return;
            }
            event.em.cancel();
        }
        Invocable iv = getInvocable("event/" + eventName + ".js", null);
        if (iv != null) {
            EventManager em = new EventManager(channelServer, iv, eventName);
            ((ScriptEngine) iv).put("em", em);
            events.put(eventName, new EventEntry(eventName, iv, em));
            try {
                iv.invokeFunction("init", (Object) null);
            } catch (final Exception ex) {
                log.error("Exception occurred in function 'init', event name: " + eventName, ex);
            }
        } else {
            throw new IllegalArgumentException("Event not exists. Name:" + eventName);
        }
    }
}
