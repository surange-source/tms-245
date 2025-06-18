package provider;

import tools.StringUtil;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.HashMap;
import java.util.Map;

public final class MapleDataTool {

    public static String getString(MapleData data) {
        return data == null ? null : ((String) data.getData());
    }

    public static String getString(MapleData data, String def) {
        if (data == null || data.getData() == null) {
            return def;
        } else if (data.getType() == MapleDataType.STRING || data.getData() instanceof String) {
            String ret = ((String) data.getData());
            ret = ret.replace("&lt;", "<");
            ret = ret.replace("&amp;lt;", "<");
            ret = ret.replace("&gt;", ">");
            ret = ret.replace("黎", "黎");
            return ret;
        } else {
            return String.valueOf(getInt(data));
        }
    }

    public static String getString(String path, MapleData data) {
        return getString(data.getChildByPath(path));
    }

    public static String getString(String path, MapleData data, String def) {
        return getString(data == null || data.getChildByPath(path) == null ? null : data.getChildByPath(path), def);
    }

    public static double getDouble(MapleData data) {
        return (Double) data.getData();
    }

    public static float getFloat(MapleData data) {
        return (Float) data.getData();
    }

    public static float getFloat(MapleData data, float def) {
        if (data == null || data.getData() == null) {
            return def;
        } else {
            return (Float) data.getData();
        }
    }

    public static int getInt(MapleData data) {
        return Integer.valueOf(data.getData().toString());
    }

    public static int getInt(MapleData data, int def) {
        if (data == null || data.getData() == null) {
            return def;
        } else {
            if (data.getType() == MapleDataType.STRING) {
                String data_ = getString(data);
                if (data_.isEmpty()) {
                    data_ = "0";
                }
                return Integer.parseInt(data_);
            } else if (data.getType() == MapleDataType.SHORT) {
                return (int) (Short) data.getData();
            } else {
                return (Integer) data.getData();
            }
        }
    }

    public static int getInt(String path, MapleData data) {
        return getInt(data.getChildByPath(path));
    }

    public static int getIntConvert(MapleData data) {
        if (data.getType() == MapleDataType.STRING) {
            return Integer.parseInt(getString(data));
        } else {
            return getInt(data);
        }
    }

    public static int getIntConvert(String path, MapleData data) {
        MapleData d = data.getChildByPath(path);
        if (d.getType() == MapleDataType.STRING) {
            return Integer.parseInt(getString(d));
        } else {
            return getInt(d);
        }
    }

    public static int getInt(String path, MapleData data, int def) {
        if (data == null) {
            return def;
        }
        return getInt(data.getChildByPath(path), def);
    }

    public static int getIntConvert(String path, MapleData data, int def) {
        if (data == null) {
            return def;
        }
        return getIntConvert(data.getChildByPath(path), def);
    }

    public static int getIntConvert(MapleData d, int def) {
        if (d == null) {
            return def;
        }
        if (d.getType() == MapleDataType.STRING) {
            String dd = getString(d);
            if (dd.endsWith("%")) {
                dd = dd.substring(0, dd.length() - 1);
            }
            try {
                return Integer.parseInt(dd);
            } catch (NumberFormatException nfe) {
                return def;
            }
        } else {
            return getInt(d, def);
        }
    }

    public static long getLong(MapleData data) {
        return Long.valueOf(data.getData().toString());
    }

    public static long getLong(MapleData data, long def) {
        if (data == null || data.getData() == null) {
            return def;
        } else {
            if (data.getType() == MapleDataType.STRING) {
                String data_ = getString(data);
                if (data_.isEmpty()) {
                    data_ = "0";
                }
                return Long.parseLong(data_);
            } else {
                return ((Number) data.getData()).longValue();
            }
        }
    }

    public static long getLong(String path, MapleData data) {
        return getLong(data.getChildByPath(path));
    }

    public static long getLongConvert(MapleData data) {
        if (data.getType() == MapleDataType.STRING) {
            return Long.parseLong(getString(data));
        } else {
            return getLong(data);
        }
    }

    public static long getLongConvert(String path, MapleData data) {
        MapleData d = data.getChildByPath(path);
        if (d.getType() == MapleDataType.STRING) {
            return Long.parseLong(getString(d));
        } else {
            return getLong(d);
        }
    }

    public static long getLong(String path, MapleData data, long def) {
        if (data == null) {
            return def;
        }
        return getLong(data.getChildByPath(path), def);
    }

    public static long getLongConvert(String path, MapleData data, int def) {
        if (data == null) {
            return def;
        }
        return getLongConvert(data.getChildByPath(path), def);
    }

    public static long getLongConvert(MapleData d, int def) {
        if (d == null) {
            return def;
        }
        if (d.getType() == MapleDataType.STRING) {
            String dd = getString(d);
            if (dd.endsWith("%")) {
                dd = dd.substring(0, dd.length() - 1);
            }
            try {
                return Long.parseLong(dd);
            } catch (NumberFormatException nfe) {
                return def;
            }
        } else {
            return getLong(d, def);
        }
    }

    public static BufferedImage getImage(MapleData data) {
        return ((MapleCanvas) data.getData()).getImage();
    }

    public static Point getPoint(MapleData data) {
        return ((Point) data.getData());
    }

    public static Point getPoint(String path, MapleData data) {
        return getPoint(data.getChildByPath(path));
    }

    public static Point getPoint(String path, MapleData data, Point def) {
        MapleData pointData = data.getChildByPath(path);
        if (pointData == null) {
            return def;
        }
        return getPoint(pointData);
    }

    public static String getFullDataPath(MapleData data) {
        String path = "";
        MapleDataEntity myData = data;
        while (myData != null) {
            path = myData.getName() + "/" + path;
            myData = myData.getParent();
        }
        return path.substring(0, path.length() - 1);
    }

    public static Map<?, ?> getAllMapleData(MapleData data) {
        Map<Object, Object> ret = new HashMap<>();
        for (MapleData subdata : data) {
            switch (subdata.getName()) {
                case "icon":
                case "iconRaw":
                    boolean isHash;
                    boolean isInLink;
                    boolean isOutLink;
                    for (MapleData subdatum : subdata) {
                        isHash = subdatum.getName().equals("_hash");
                        isInLink = subdatum.getName().equals("_inlink");
                        isOutLink = subdatum.getName().equals("_outlink");

                        if (isHash) {
                            ret.put(subdatum.getName(), subdatum.getData().toString());
                        } else if (isInLink || isOutLink) {
                            int inlink = 0;
                            String[] split = subdatum.getData().toString().replace(".img", "").split("/");
                            for (int i = 0; i < split.length; i++) {
                                if ((isInLink && i == 0 || isOutLink && (i == 2 || i == 3)) && StringUtil.isNumber(split[i])) {
                                    inlink = Integer.valueOf(split[i]);
                                }
                            }
                            if (inlink != 0) {
                                ret.put(subdatum.getName(), inlink);
                            }
                        }
                    }
                    continue;
            }
            ret.put(subdata.getName(), subdata.getChildren().isEmpty() ? subdata.getData() : getAllMapleData(subdata));
        }
        return ret;
    }
}
