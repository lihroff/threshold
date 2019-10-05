declare namespace threshold {
  interface Options {
    /**
		  Maximum number of calls.
		  @default 1
		*/
    times?: number;
    /**
		  Throw an error when called more than once.
		  @default false
		*/
    throw?: boolean;
    /**
      Time period.
      string -> '1[d/h/m/s]' | '2m30s'
      number(millisecond) -> 10000
		*/
    within?: number | string;
  }

  type onceOptions = Pick<threshold.Options, Exclude<keyof threshold.Options, 'times'>>;

  interface CallInfo {
    times: number;
    callable: boolean;
  }
}

declare function _threshold<ArgumentsType extends unknown[], ReturnType>(
  options: threshold.Options,
  fn: (...arguments: ArgumentsType) => ReturnType,
): (...arguments: ArgumentsType) => ReturnType;

declare function _threshold<ArgumentsType extends unknown[], ReturnType>(
  options: threshold.Options,
): (fn: (...arguments: ArgumentsType) => ReturnType) => (...arguments: ArgumentsType) => ReturnType;

export const threshold: typeof _threshold;
export function once<ArgumentsType extends unknown[], ReturnType>(
  fn: (...arguments: ArgumentsType) => ReturnType,
  options?: threshold.onceOptions,
): (...arguments: ArgumentsType) => ReturnType;
export function callInfo(fn: (...arguments: unknown[]) => unknown): threshold.CallInfo;
