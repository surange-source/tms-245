function enter(pi) {
    var pos = [
        [327,-855],
        [1011,-842],
        [87,-693],
        [543,-685],
        [1102,-619],
        [157,-550],
        [716,-490],
        [365,-375],
        [967,-331],
        [1214,-378],
        [134,-267],
        [800,-194],
        [1169,-143],
        [332,-125],
        [617,-48]
    ];
    var num = Math.floor( Math.random()*pos.length );
    pi.teleport(3, pi.getPlayer().getId(), new java.awt.Point( pos[num][0], pos[num][1]));
}