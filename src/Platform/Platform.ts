/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {
    // 远程资源路径;
    _resRoot: string;

    /**平台初始化 */
    init(width: number, height: number);
}


declare let platform: Platform;
declare interface Window {
    platform: Platform
    // 平台类型自定义, 方便应用层访问检测获知当前是什么平台环境;
    platType: PlatT;
}

// 平台类型
enum PlatT {
    err = 0,
    qzone = 1,      // qq空间
    qqWan = 2,      // QQ玩一玩平台;
    inner = 3,      // 内部版本;
    wx = 4,         // 微信平台;
    tt = 5,         // 今日头条;
}