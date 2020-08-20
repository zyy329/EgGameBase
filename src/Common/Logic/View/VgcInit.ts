/**
 * 显示层 初始化控制系统
 */
class VgcInit extends VgcBase {
    // 注意!!! 不应开放为 public; 仅供 loadTheme 使用;
    private _stage: egret.Stage;

    public Init(stage: egret.Stage) {
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        // 全局默认字体设置;
        egret.TextField.default_fontFamily = "Microsoft YaHei";

        // 显示管理器初始化;
        VgcBase.vi.Init(stage);

        this._stage = stage;
    }

    ////////////////////////////////////////////////////////////////////////////////
    /** 加载皮肤主题配置文件 */
    public async loadTheme() {
        return new Promise((resolve, reject) => {
            let theme = new eui.Theme("resource/default.thm.json", this._stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
    }
}