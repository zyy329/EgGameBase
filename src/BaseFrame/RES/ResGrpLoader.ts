/**
 * 资源组 加载工具类;
 */
class ResGrpLoader {
    /** 加载尝试次数 */
    private static LOAD_TRY_TIMES = 3;

    private _grpName: string;       // 加载资源组 名
    private _priority: number;      // 加载优先级;
    public _finish: boolean;        // 加载完成标记; true: 加载完成;
    public _cur: number;            // Progress 加载进度当前值;
    public _total: number;          // Progress 加载进度总值;
    private _tryTimes: number;      // 已尝试加载次数;

    public constructor(grpName: string, priority: number) {
        this._grpName = grpName;
        this._priority = priority;
        this._finish = false;
        this._cur = 0;
        this._total = -1;       // 表明还未开始加载; 加载进度总值还未被计算出来;
        this._tryTimes = 0;
    }

    // 发起加载;
    public async Load() {
        LogMgr.Info(this, `----- Start load ${this._grpName}`);
        if (this._grpName.length > 0) {
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);

            try {
                this._tryTimes++;
                await RES.loadGroup(this._grpName, this._priority);
            } catch (e) {
                if (this._tryTimes < ResGrpLoader.LOAD_TRY_TIMES) {
                    LogMgr.Error(this, `----- load ${this._grpName} Err, try again:${this._tryTimes};  ${e}`);
                    // 再次尝试;
                    await this.Load();
                } else {
                    // 加载彻底失败, 抛出异常, 留给上层处理;
                    LogMgr.Error(this, `----- load ${this._grpName} Faild ${e}`);
                    RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
                    throw e;
                }
            }
            
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProgress, this);
        }
        // 加载成功;
        this._finish = true;
        LogMgr.Info(this, `----- End load ${this._grpName}`);
    }

    // 加载进度更新;
    private onProgress(event: RES.ResourceEvent): void {
        if (event.groupName === this._grpName) {
            this._cur = event.itemsLoaded;
            this._total = event.itemsTotal;
        }
    }
}