export type EventInfo = {
    id: number
    year: number
    text: string
}
export type Segment = {
    id: number
    index: number
    title?: string
    startYear: number
    endYear: number
    events: EventInfo[]
}
export type State = {
    segments: Segment[]
    activeSegmentId: number
}