import MemberScavengedResultPage from './MemberScavengedResultPage'

const CoinCodeScanPage = (page) => {
    return {
        enterCoinCode: async (code) => {
            const coinTextbox = page.getByTestId("textbox-usb-scanner-code")
            await coinTextbox.fill(code)
            await coinTextbox.press('Enter')
        },

        getScannedCoins: async () => {
            const scannedCoinsElements = await page.locator('span.coin > .coin-value').all()

            const scannedCoinValues = []

            for (let j = 0; j < scannedCoinsElements.length; j++) {
                const scannedCoinElement = scannedCoinsElements[j];
                const str = await scannedCoinElement.textContent();
                scannedCoinValues.push(Number(str))
            }

            return scannedCoinValues;
        },

        clickFinishScanningButton: async () => {
            const finishScanningButton = page.getByTestId("button-finish-scanning");
            await finishScanningButton.click()

            return MemberScavengedResultPage(page);
        },

        getTotalCoinValue : async () => {
            return Number(await page.getByTestId("coin-total").textContent())
        }
    }
}

export default CoinCodeScanPage