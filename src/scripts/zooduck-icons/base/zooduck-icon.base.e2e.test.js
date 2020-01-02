describe('HTMLZooduckIconBaseElement', () => {
    beforeAll(async () => {
        await page.goto(`${PATH}/index.html`);
    });

    it('should have a shadowRoot', async () => {
        await page.setContent(`
            <zooduck-icon-base></zooduck-icon-base>
        `);

        const el = await page.$('zooduck-icon-base');

        const shadowRoot = await page.evaluate((el) => el.shadowRoot, el);

        expect(shadowRoot).not.toBeNull();
    });

    it('should sync attributes to properties', async () => {
        await page.setContent(`
            <zooduck-icon-base
                backgroundcolor="domper"
                color="pomper"
                size="1">
            </zooduck-icon-base>
        `);

        const el = await page.$('zooduck-icon-base');

        const props = await page.evaluate((el) => {
            return [
                el.backgroundcolor,
                el.color,
                el.size,
            ];
        }, el);

        expect(props).toEqual([
            'domper',
            'pomper',
            '1',
        ]);

    });

    it('should sync properties to attributes', async () => {
        await page.setContent(`
            <zooduck-icon-base></zooduck-icon-base>
        `);

        const el = await page.$('zooduck-icon-base');

        let attrs = await page.evaluate((el) => {
            return [
                el.getAttribute('backgroundcolor'),
                el.getAttribute('color'),
                el.getAttribute('size'),
            ];
        }, el);

        expect(attrs).toEqual([
            null,
            null,
            null,
        ]);

        await page.evaluate((el) => {
            el.backgroundcolor = 'domper';
            el.color = 'pomper';
            el.size = '1';
        }, el);

        attrs = await page.evaluate((el) => {
            return [
                el.getAttribute('backgroundcolor'),
                el.getAttribute('color'),
                el.getAttribute('size'),
            ];
        }, el);

        expect(attrs).toEqual([
            'domper',
            'pomper',
            '1',
        ]);
    });

    it('should updpate its base attribute values if a default is set', async () => {
        await page.setContent(`
            <zooduck-icon-base></zooduck-icon-base>
        `);

        const el = await page.$('zooduck-icon-base');

        let backgroundColorProp = await page.evaluate((el) => {
            return el.backgroundcolor;
        }, el);

        expect(backgroundColorProp).toEqual('#fff');

        await page.evaluate((el) => {
            el.defaultBackgroundColor = 'BANANA';
        }, el);

        backgroundColorProp = await page.evaluate((el) => {
            return el.backgroundcolor;
        },  el);

        expect(backgroundColorProp).toEqual('BANANA');

        let colorProp = await page.evaluate((el) => {
            return el.color;
        }, el);

        expect(colorProp).toEqual('#222');

        await page.evaluate((el) => {
            el.defaultColor = 'POMPER';
        }, el);

        colorProp = await page.evaluate((el) => {
            return el.color;
        },  el);

        expect(colorProp).toEqual('POMPER');

        let sizeProp = await page.evaluate((el) => {
            return el.size;
        }, el);

        expect(sizeProp).toEqual('50');

        await page.evaluate((el) => {
            el.defaultSize = 'DOMPER';
        }, el);

        sizeProp = await page.evaluate((el) => {
            return el.size;
        },  el);

        expect(sizeProp).toEqual('DOMPER');
    });
});
