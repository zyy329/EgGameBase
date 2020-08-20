/**
 * 加载批次控制;
 * 可动态往批次中添加想要下载的资源组;
 * 同一批次的加载会依次挨个加载
 * 共享相同的加载优先级
 */
class LoadBatch {
    private _nameMap: { [name: string]: ResGrpLoader };
    private _grpArr: Array<ResGrpLoader>;

    // 该批次资源下载优先级;
    private _priority: number;
    // 当前下载资源组索引;
    private _curLoadIdx: number;
    // 加载中标记;
    private _loadSign: boolean;


    public constructor(priority: number) {
        this._priority = priority;
        this.clear();
    }

    // 清空原有的加载批次; 已经发起加载的不会停止;
    public clear(): void {
        this._nameMap = {};
        this._grpArr = new Array<ResGrpLoader>();
        this._curLoadIdx = 0;
        this._loadSign = false;
    }

    /**
     * 添加加载组;
     */
    public AddGrp(grpName: string) {
        if (this.HasGrp(grpName)) {
            // 已经存在该组资源, 不需要重复加入;
            return;
        }

        // 加入加载批次;
        let grp = new ResGrpLoader(grpName, this._priority);
        this._nameMap[grpName] = grp;
        this._grpArr.push(grp);

        // 触发加载;
        this.Load();
    }

    // 全部加载完成判断;
    public IsAllFinish(): boolean {
        // 理论上只要有加载就会吃讯处于加载状态中; 没有处于加载状态, 就可以认为当前所有资源都已加载完成;
        return !this._loadSign;
    }

    // 目标加载组存 是否已经在批次中;
    public HasGrp(grpName: string): boolean {
        return this._nameMap[grpName] ? true : false;
    }

    // 获得当前加载分组;
    public GetCurLoad(): ResGrpLoader {
        return this._curLoadIdx < this._grpArr.length ? this._grpArr[this._curLoadIdx] : null;
    }

    // 加载驱动; 
    private async Load(): Promise<void> {
        if (this._loadSign) {
            // 已经发起加载, 不需要重复进入;
            return;
        }
        this._loadSign = true;

        // 循环依次加载所有资源组
        while (this._curLoadIdx < this._grpArr.length) {
            let grp: ResGrpLoader = this._grpArr[this._curLoadIdx];
            await grp.Load();
            this._curLoadIdx++;
        }
        this._loadSign = false;
    }
}