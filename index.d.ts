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
  threshold: <ArgumentsType extends any[], ReturnType>(
    options?: threshold.Options,
    fn: (...arguments: ArgumentsType) => ReturnType,
  ) => (...arguments: ArgumentsType) => ReturnType;

  once: <ArgumentsType extends any[], ReturnType>(
    fn: (...arguments: ArgumentsType) => ReturnType,
    options?: threshold.onceOptions,
  ) => (...arguments: ArgumentsType) => ReturnType;

  default: typeof threshold;
};

export = threshold;
