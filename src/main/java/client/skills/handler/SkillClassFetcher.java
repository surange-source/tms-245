package client.skills.handler;

import client.skills.handler.冒險家.*;
import client.skills.handler.皇家騎士團.*;
import client.skills.handler.英雄團.*;
import client.skills.handler.末日反抗軍.*;
import client.skills.handler.曉之陣.*;
import client.skills.handler.超新星.*;
import client.skills.handler.雷普族.*;
import client.skills.handler.阿尼瑪族.*;
import client.skills.handler.異界.*;
import client.skills.handler.怪物.*;
import client.skills.handler.其他.*;

import java.util.LinkedList;
import java.util.List;

public class SkillClassFetcher {

    private static final List<AbstractSkillHandler> skillHandlers = new LinkedList<>();

    static {
        loadHandlers();
    }

    public static void loadHandlers() {
        final Class<?>[] skillClasses = {
                初心者.class,
                劍士.class,
                英雄.class,
                聖騎士.class,
                黑騎士.class,
                法師.class,
                火毒大魔導士.class,
                冰雷大魔導士.class,
                主教.class,
                弓箭手.class,
                箭神.class,
                神射手.class,
                開拓者.class,
                盜賊.class,
                夜使者.class,
                暗影神偷.class,
                影武者.class,
                海盜.class,
                拳霸.class,
                槍神.class,
                重砲指揮官.class,
                蒼龍俠客.class,
                MANAGER.class,
                管理員.class,
                貴族.class,
                聖魂劍士.class,
                烈焰巫師.class,
                破風使者.class,
                暗夜行者.class,
                閃雷悍將.class,
                狂狼勇士.class,
                龍魔導士.class,
                精靈遊俠.class,
                幻影俠盜.class,
                隱月.class,
                夜光.class,
                惡魔.class,
                惡魔殺手.class,
                惡魔復仇者.class,
                市民.class,
                煉獄巫師.class,
                狂豹獵人.class,
                機甲戰神.class,
                傑諾.class,
                爆拳槍神.class,
                劍豪.class,
                陰陽師.class,
                米哈逸.class,
                凱撒.class,
                凱殷.class,
                天使破壞者.class,
                卡蒂娜.class,
                神之子.class,
                幻獸師.class,
                皮卡啾.class,
                雪吉拉.class,
                凱內西斯.class,
                阿戴爾.class,
                伊利恩.class,
                亞克.class,
                菈菈.class,
                虎影.class,
                墨玄.class,

                冒險家.class,
                皇家騎士團.class,
                英雄團.class,
                末日反抗軍.class,
                曉之陣.class,
                超新星.class,
                雷普族.class,
                異界.class,
                阿尼瑪族.class,

                格蘭蒂斯.class,
                全部劍士.class,
                全部法師.class,
                全部弓箭手.class,
                全部盜賊.class,
                全部海盜.class,
                全職通用.class
        };

        skillHandlers.clear();
        for (Class<?> c : skillClasses) {
            try {
                if (!AbstractSkillHandler.class.isAssignableFrom(c)) {
                    continue;
                }
                skillHandlers.add((AbstractSkillHandler) c.newInstance());
            } catch (InstantiationException | IllegalAccessException ex) {
                System.err.println("Error: handle was not found in " + c.getSimpleName() + ".class");
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }

    public static AbstractSkillHandler getHandlerBySkill(int skillid) {
        for (AbstractSkillHandler ash : skillHandlers) {
            if (!ash.containsSkill(skillid)) {
                continue;
            }
            return ash;
        }
        return null;
    }

    public static AbstractSkillHandler getHandlerByJob(int jobWithSub) {
        for (AbstractSkillHandler ash : skillHandlers) {
            if (!ash.containsJob(jobWithSub)) {
                continue;
            }
            return ash;
        }
        return null;
    }
}