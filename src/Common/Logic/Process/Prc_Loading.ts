/**
 * 游戏 加载处理流程;
 */
class Prc_Loading implements PrcBase {
    // 激活;
    public async OnActive(): Promise<void> {
    }
    // 失活;
    public OnDeactive(): void {
    }
    // 更新; timeSpan, 距离上次更新的时间差;  单位毫秒;
    public Update(timeSpan: number): void {
    }
}