/**
 * 资源下载 系统
 * 负责资源的 下载处理
 */
class ResLoader extends VgcBase {
    private static LOCAL_PATH = "default.res.json";
    private static REMOTE_PATH = "remote/remote.res.json";
    private static MAIN_PRIORITY = 1000;
    private static BACK_PRIORITY = -1000;


    // 主加载批次;
    private _mainLoad: LoadBatch = new LoadBatch(ResLoader.MAIN_PRIORITY);
    // 后台加载批次;
    private _backLoad: LoadBatch = new LoadBatch(ResLoader.BACK_PRIORITY);


    // 加载资源配置;
    public async LoadCfg(): Promise<void> {
        // local 资源配置加载;
        let localRoot: string;
        switch (window.platType) {
            case PlatT.qqWan: {
                localRoot = "GameRes://resource/";
            } break;
            default: {
                localRoot = "resource/";
            } break;
        }
        let localCfg: ResCfgLoader = new ResCfgLoader(localRoot + ResLoader.LOCAL_PATH, localRoot);
        await localCfg.Load();

        // // remote 资源配置加载;
        // let resUrl: string;
        // let resRoot: string = window.platform._resRoot + "resource/";
        // if (RELEASE) {
        //     resUrl = ResLoader.REMOTE_PATH;
        // } else {
        //     resUrl = "resource/" + ResLoader.REMOTE_PATH;
        // }
        // let remoteCfg = new ResCfgLoader(resUrl, resRoot);
        // await remoteCfg.Load();
    }

    // 首包资源 加载;
    // 该项载入完成后, 游戏即可显示首包背景图;
    public async LoadOnStart(): Promise<void> {
        // 加载开始场景 资源组;
        let start = new ResGrpLoader(ResGrpNames.START, ResLoader.MAIN_PRIORITY);
        await start.Load();

        // 静默加载全局资源组
        let glb = new ResGrpLoader(ResGrpNames.GLOBAL, ResLoader.MAIN_PRIORITY);
        glb.Load();
    }

    // 加载登录界面资源;
    public async LoadLodingRes(): Promise<void> {
        // 加载登录界面资源组;
        let loadRes = new ResGrpLoader(ResGrpNames.LOAD, ResLoader.MAIN_PRIORITY);
        await loadRes.Load();
    }

    // 加载 固定主体资源(每次进游戏主场景前, 必须完成的加载);
    public LoadMainRes() {
        // 配置资源;    
        this._mainLoad.AddGrp(ResGrpNames.CFG);

        // 加载主体资源;
        this._mainLoad.AddGrp(ResGrpNames.MAIN);
    }

    // 动态添加 主体加载资源(通常是根据玩家数据, 动态决定加载的资源)
    public AddMainLoad(grpName: string) {
        this._mainLoad.AddGrp(grpName);
    }

    // 动态添加 后台加载资源
    public AddBackLoad(grpName: string) {
        this._backLoad.AddGrp(grpName);
    }
}