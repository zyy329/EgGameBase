/** 
 * 调试版 平台数据接口 实现。
 */
class DebugPlatform implements Platform {
    // 远程资源路径;
    _resRoot: string = "";


    init(width: number, height: number) {
    }
}


if (!window.platform) {
    window.platform = new DebugPlatform();
    window.platType = PlatT.inner;
}