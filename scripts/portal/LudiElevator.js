/*
    This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
               Matthias Butz <matze@odinms.de>
               Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* 郡府海撈磐
 */
var status;
function start() {
    status = -1;
    action(1, 1, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
        if (cm.getMapId() == 222020200) {
            cm.TimeMoveMap(222020210, 222020100, 13);
            cm.getPlayer().dropMessage(6, "檔饅且 摸籃 秋府坷膠 啪 2摸, 酒閥付闌撈 樂綽 摸澇聰促.");
            cm.dispose();
        } else {
            cm.TimeMoveMap(222020110, 222020200, 13);
            cm.getPlayer().dropMessage(6, "檔饅且 摸籃 秋府坷膠 啪 99摸, 風叼宏府決撈 樂綽 摸澇聰促.");
            cm.dispose();
        }
    }





else { 
            cm.dispose();
        }
    }
}
