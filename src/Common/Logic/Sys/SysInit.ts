/**
 * 逻辑层 初始化控制系统
 */
class SysInit extends SysBase{
    public Init(): void {
        // 操作系统环境记录;
        if (egret.Capabilities.os == "iOS") {
            SysBase.dt.login.osType = 2;
        }
        else if (egret.Capabilities.os == "Android") {
            SysBase.dt.login.osType = 1;
        }
    }
}