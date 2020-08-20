/**
 * 流程处理逻辑 基类;
 */
interface PrcBase {
    // 激活;
    OnActive(): void;
    // 失活;
    OnDeactive(): void;
    // 更新; timeSpan, 距离上次更新的时间差;  单位毫秒;
    Update(timeSpan: number): void;
}