
/**
 * 日志输出管理器;
 * 对 egret 的输出做一层封装; 
 *      统一格式化输出; 强制要求传入 对象;
 *      方便统一屏蔽日志输出级别(利用 DEBUG 标签, 这样编译出的最终代码可以不包括无效的部分;
 *      在需要时附加输出到文件 或 上报到服务器的功能;
 */
class LogMgr {
    public static Debug(cls: Object, message?: any) {
        if (DEBUG) {
            if (message === undefined) {
                egret.log(`[INFO] ${this.Title(cls)}`);
            } else {
                egret.log(`[INFO] ${this.Title(cls)}`, message);
            }
        }
    }
    public static Info(cls: Object, message?: any) {
            if (message === undefined) {
                egret.log(`[INFO] ${this.Title(cls)}`);
            } else {
                egret.log(`[INFO] ${this.Title(cls)}`, message);
            }
    }

    public static Warn(cls: Object, message?: any) {
        if (message === undefined) {
            egret.warn(`[WARN] ${this.Title(cls)}`);
        } else {
            egret.warn(`[WARN] ${this.Title(cls)}`, message);
        }
    }

    public static Error(cls: Object, message?: any) {
        if (message === undefined) {
            egret.error(`[ERR] ${this.Title(cls)}`);
        } else {
            egret.error(`[ERR] ${this.Title(cls)}`, message);
        }
    }

    // 统一打印消息头
    // obj 不是类对象的时候打印: Object
    private static Title(cls: Object): string {
        let className: string;
        if (typeof cls === "string") {
            className = cls;
        } else {
            className = egret.getQualifiedClassName(cls);
        }

        let timeStr = new Date().toLocaleString();
        return `[${timeStr} ${className}]`;
    }
}