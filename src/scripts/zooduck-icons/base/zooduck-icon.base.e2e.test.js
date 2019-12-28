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
});
