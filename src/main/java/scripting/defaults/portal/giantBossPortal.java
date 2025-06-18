package scripting.defaults.portal;

import client.MapleBuffStat;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import scripting.defaults.event.BossGiantVellud;
import scripting.portal.PortalPlayerInteraction;
import scripting.portal.PortalScript;

import java.util.Arrays;
import java.util.List;

public class giantBossPortal implements PortalScript {

    protected static final Logger log = LogManager.getLogger("scripting");

    @Override
    public void enter(PortalPlayerInteraction pi) {
        pi.playPortalSE();
        try {
            List<Integer> hideMob = Arrays.asList(
                    BossGiantVellud.MobID.死亡伯爵替身,
                    BossGiantVellud.MobID.肩膀魔王廣域攻擊用替身,
                    BossGiantVellud.MobID.肩膀魔王廣域攻擊用替身_1,
                    BossGiantVellud.MobID.區域廣域攻擊用替身,
                    BossGiantVellud.MobID.區域廣域攻擊用替身_1,
                    BossGiantVellud.MobID.區域廣域攻擊用替身_2,
                    BossGiantVellud.MobID.墮落貝伊之石,
                    BossGiantVellud.MobID.墮落貝伊之石_1,
                    BossGiantVellud.MobID.墮落貝伊之石_2,
                    BossGiantVellud.MobID.墮落貝伊之石_3
            );
            if (pi.getMap().getAllMonster().stream().anyMatch(mob -> !hideMob.contains(mob.getId())) && !pi.getPortalName().startsWith("out")) {
                pi.playerMessage(5, "若想要經過此通道，必須擊退邪惡氣息。");
                return;
            }
            switch (pi.getMapId()) {
                case BossGiantVellud.MapID.往培羅德:
                    switch (pi.getPortal().getId()) {
                        case 6:
                            pi.warpS(BossGiantVellud.MapID.培羅德西邊懸崖下段, 2);
                            break;
                        case 7:
                            pi.warpS(BossGiantVellud.MapID.培羅德東邊懸崖下段, 2);
                            break;
                        case 8:
                            pi.warpS(BossGiantVellud.MapID.培羅德的右腳下層, 1);
                            break;
                        case 9:
                            pi.warpS(BossGiantVellud.MapID.培羅德的左腳下層, 1);
                            break;
                    }
                    break;
                case BossGiantVellud.MapID.培羅德的右腳下層:
                    switch (pi.getPortal().getId()) {
                        case 1:
                            pi.warpS(BossGiantVellud.MapID.往培羅德, 8);
                            break;
                        case 2:
                            pi.warpS(BossGiantVellud.MapID.培羅德的右腳上層, 1);
                            break;
                    }
                    break;
                case BossGiantVellud.MapID.培羅德的右腳上層:
                    switch (pi.getPortal().getId()) {
                        case 1:
                            pi.warpS(BossGiantVellud.MapID.培羅德的右腳下層, 2);
                            break;
                        case 2:
                            pi.warpS(BossGiantVellud.MapID.培羅德的腹部, 2);
                            break;
                    }
                    break;
                case BossGiantVellud.MapID.培羅德的左腳下層:
                    switch (pi.getPortal().getId()) {
                        case 1:
                            pi.warpS(BossGiantVellud.MapID.往培羅德, 9);
                            break;
                        case 2:
                            pi.warpS(BossGiantVellud.MapID.培羅德的左腳上層, 1);
                            break;
                    }
                    break;
                case BossGiantVellud.MapID.培羅德的左腳上層:
                    switch (pi.getPortal().getId()) {
                        case 1:
                            pi.warpS(BossGiantVellud.MapID.培羅德的左腳下層, 2);
                            break;
                        case 2:
                            pi.warpS(BossGiantVellud.MapID.培羅德的腹部, 1);
                            break;
                    }
                    break;
                case BossGiantVellud.MapID.培羅德的腹部:
                    if (pi.getPlayer().getBuffedIntValue(MapleBuffStat.培羅德束縛) > 0) {
                        pi.playerMessage(5, "被邪惡的氣息束縛住無法移動。");
                        break;
                    }
                    switch (pi.getPortal().getId()) {
                        case 1:
                            pi.warpS(BossGiantVellud.MapID.培羅德的左腳上層, 2);
                            break;
                        case 2:
                            pi.warpS(BossGiantVellud.MapID.培羅德的右腳上層, 2);
                            break;
                        case 3:
                            pi.warpS(BossGiantVellud.MapID.培羅德的心臟, 2);
                            break;
                    }
                    break;
                case BossGiantVellud.MapID.培羅德西邊懸崖下段:
                    switch (pi.getPortal().getId()) {
                        case 1:
                            pi.warpS(BossGiantVellud.MapID.培羅德西邊懸崖上段, 1);
                            break;
                        case 2:
                            pi.warpS(BossGiantVellud.MapID.往培羅德, 6);
                            break;
                    }
                    break;
                case BossGiantVellud.MapID.培羅德西邊懸崖上段:
                    switch (pi.getPortal().getId()) {
                        case 1:
                            pi.warpS(BossGiantVellud.MapID.培羅德西邊懸崖下段, 1);
                            break;
                        case 2:
                            pi.warpS(BossGiantVellud.MapID.培羅德的右上臂, 2);
                            break;
                    }
                    break;
                case BossGiantVellud.MapID.培羅德的右上臂:
                    switch (pi.getPortal().getId()) {
                        case 1:
                            pi.warpS(BossGiantVellud.MapID.培羅德的心臟, 1);
                            break;
                        case 2:
                            pi.warpS(BossGiantVellud.MapID.培羅德西邊懸崖上段, 2);
                            break;
                        case 3:
                            pi.warpS(BossGiantVellud.MapID.培羅德的右肩, 1);
                            break;
                    }
                    break;
                case BossGiantVellud.MapID.培羅德的右肩:
                    switch (pi.getPortal().getId()) {
                        case 1:
                            pi.warpS(BossGiantVellud.MapID.培羅德的右上臂, 3);
                            break;
                        case 3:
                            pi.warpS(BossGiantVellud.MapID.培羅德的心臟, 4);
                            break;
                    }
                    break;
                case BossGiantVellud.MapID.培羅德東邊懸崖下段:
                    switch (pi.getPortal().getId()) {
                        case 1:
                            pi.warpS(BossGiantVellud.MapID.培羅德東邊懸崖上段, 1);
                            break;
                        case 2:
                            pi.warpS(BossGiantVellud.MapID.往培羅德, 7);
                            break;
                    }
                    break;
                case BossGiantVellud.MapID.培羅德東邊懸崖上段:
                    switch (pi.getPortal().getId()) {
                        case 1:
                            pi.warpS(BossGiantVellud.MapID.培羅德東邊懸崖下段, 1);
                            break;
                        case 2:
                            pi.warpS(BossGiantVellud.MapID.培羅德的左上臂, 1);
                            break;
                    }
                    break;
                case BossGiantVellud.MapID.培羅德的左上臂:
                    switch (pi.getPortal().getId()) {
                        case 1:
                            pi.warpS(BossGiantVellud.MapID.培羅德東邊懸崖上段, 2);
                            break;
                        case 2:
                            pi.warpS(BossGiantVellud.MapID.培羅德的心臟, 5);
                            break;
                        case 3:
                            pi.warpS(BossGiantVellud.MapID.培羅德的左肩, 1);
                            break;
                    }
                    break;
                case BossGiantVellud.MapID.培羅德的左肩:
                    switch (pi.getPortal().getId()) {
                        case 1:
                            pi.warpS(BossGiantVellud.MapID.培羅德的左上臂, 3);
                            break;
                        case 3:
                            pi.warpS(BossGiantVellud.MapID.培羅德的心臟, 6);
                            break;
                    }
                    break;
                case BossGiantVellud.MapID.培羅德的心臟:
                    switch (pi.getPortal().getId()) {
                        case 1:
                            pi.warpS(BossGiantVellud.MapID.培羅德的右上臂, 1);
                            break;
                        case 2:
                            pi.warpS(BossGiantVellud.MapID.培羅德的腹部, 3);
                            break;
                        case 3:
                            pi.warpS(BossGiantVellud.MapID.培羅德的頭, 0);
                            break;
                        case 4:
                            pi.warpS(BossGiantVellud.MapID.培羅德的右肩, 3);
                            break;
                        case 5:
                            pi.warpS(BossGiantVellud.MapID.培羅德的左上臂, 2);
                            break;
                        case 6:
                            pi.warpS(BossGiantVellud.MapID.培羅德的左肩, 3);
                            break;
                    }
                    break;
                case BossGiantVellud.MapID.培羅德的頭:
                    switch (pi.getPortal().getId()) {
                        case 2:
                            pi.warpS(BossGiantVellud.MapID.培羅德的心臟, 3);
                            break;
                    }
                    break;
            }
        } catch (Exception e) {
            log.error("Portal Name : " + pi.getPortalName() + " ID : " + pi.getPortal().getId() + "Error: ", e);
        }
    }
}
