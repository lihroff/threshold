declare namespace threshold {
  interface Options {
    /**
		  Maximum number of calls.
		  @default 1
		*/
    time?: number;
    /**
		  Throw an error when called more than once.
		  @default false
		*/
    overflow?: boolean;
    /**
      Time period.
      string -> '1[d/h/m/s]' | '2m30s'
      number(millisecond) -> 10000
		*/
    within?: number | string;
  }

  type onceOptions = Exclude<keyof threshold.Options, 'time'>;
}

declare const threshold: {
  threshold: <ArgumentsType extends unknown[], ReturnType>(
    options: threshold.Options,
    fn: (...arguments: ArgumentsType) => ReturnType,
  ) => (...arguments: ArgumentsType) => ReturnType;

  once: <ArgumentsType extends unknown[], ReturnType>(
    fn: (...arguments: ArgumentsType) => ReturnType,
    options?: threshold.onceOptions,
  ) => (...arguments: ArgumentsType) => ReturnType;
};

export = threshold;

export default threshold.threshold;
