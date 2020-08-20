/**
 * 资源 配置文件 加载工具类;
 */
class ResCfgLoader {
    /** 加载尝试次数 */
    private static LOAD_TRY_TIMES = 3;

    private _url: string;
    private _resRoot: string;
    public _finish: boolean;        // 加载完成标记; true: 加载完成;
    private _tryTimes: number;      // 已尝试加载次数;

    public constructor(url: string, resourceRoot: string) {
        this._url = url;
        this._resRoot = resourceRoot;
        this._finish = false;
        this._tryTimes = 0;
    }

    // 发起加载;
    public async Load() {
        LogMgr.Info(this, `----- Start load ${this._url} - ${this._resRoot}`);
        try {
            this._tryTimes++;
            await RES.loadConfig(this._url, this._resRoot);
        } catch (e) {
            if (this._tryTimes < ResCfgLoader.LOAD_TRY_TIMES) {
                LogMgr.Error(this, `----- load ${this._url} Err, try again:${this._tryTimes};  ${e}`);
                // 再次尝试;
                await this.Load();
            } else {
                // 加载彻底失败, 抛出异常, 留给上层处理;
                LogMgr.Error(this, `----- load ${this._url} Faild ${e}`);
                throw e;
            }
        }

        // 加载成功;
        this._finish = true;
        LogMgr.Info(this, `----- End load ${this._url}`);
    }
}