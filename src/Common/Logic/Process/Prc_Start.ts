/**
 * 游戏 刚启动处理流程;
 */
class Prc_Start implements PrcBase {
    // 激活;
    public async OnActive(): Promise<void> {
        // 系统初始化
        SysPool.init.Init();

        let load = VgcPool.load;

        // 加载资源配置配置表
        await load.LoadCfg();

        // 加载皮肤主题;
        await VgcPool.init.loadTheme();

        // 开始场景资源加载;
        await load.LoadOnStart();

        // 显示开场背景;
        VgcPool.start.Show();

        // 加载登录界面资源;
        await load.LoadLodingRes();

        // 提前开始 静默 加载主体资源;
        load.LoadMainRes();
    }
    // 失活;
    public OnDeactive(): void {
        VgcPool.start.Close();
    }
    // 更新; timeSpan, 距离上次更新的时间差;  单位毫秒;
    public Update(timeSpan: number): void {
        if (VgcPool.start.IsFinish()) {
            // 进入 loading 流程;
            PrcMgr.Active(PrcPool.E_Prc.Loading);
        }
    }
}