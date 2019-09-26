describe('outer', () => {
  /* eslint-disable no-console */
  console.log('describe outer start');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test for inner 1', () => {
      console.log('test inner 1');
      expect(true).toEqual(true);
    });
  });

  test('test 1', () => {
    console.log('test outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for inner 2', () => {
      console.log('test inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer end');
});
