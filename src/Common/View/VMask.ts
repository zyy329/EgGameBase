/**
 * 自定义显示蒙版;
 */
class VMask extends eui.Component {
    public img_mask: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/Skins/MaskSkin.exml";
    }
    public childrenCreated(): void {
        super.childrenCreated();
        this.img_mask.percentWidth = 100;
        this.img_mask.percentHeight = 100;
    }
}