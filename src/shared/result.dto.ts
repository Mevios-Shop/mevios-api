export class ResultDto {
    constructor(
        public message: string,
        public succes: boolean,
        public data: any,
        public errors: any
    ) {
        
    }
}