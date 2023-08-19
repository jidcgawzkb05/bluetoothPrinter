// frontend/bluetooth-printer.js
import { LitElement, html, css } from 'lit-element';

class BluetoothPrinter extends LitElement {
    static get properties() {
        return {
            connected: { type: Boolean },
            cms: { type: String },
            characteristic: { type: Object }
        }
    }

    static styles = css`
        :host {
            display: block;
        }
    `;

    render() {
        return html`
<!--            <button @click=${this.connectOrPrint}>Connect to Printer</button>-->
        `;
    }

    async connectOrPrint() {
        if (!this.connected) {
            console.log("Connecting to printer...");
            await this.connectToPrinter();
        } else {
            console.log("Printing...");
        }
        await this.print();
    }

    async connectToPrinter() {
        try {
            console.log("Requesting Bluetooth device...");
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['000018f0-0000-1000-8000-00805f9b34fb'] }]
            });
            console.log("Connecting to GATT server...");
            const server = await device.gatt.connect();
            const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
            this.characteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');

            this.connected = true;
            console.log("Connected to printer.");
        } catch (error) {
            console.error("Error during connection:", error);
        }
    }

    async print() {
        try {
            console.log("Printing TSPL commands...");
            // 将String 转为Array
            console.log("cms:", this.cms);
            const cms2 = [
                'SIZE 48 mm,25 mm',
                'CLS',
                'TEXT 10,10,"4",0,1,1,"HackerNoon"',
                'BARCODE 10,60,"128",90,1,0,2,2,"altospos.com"',
                'PRINT 1',
                'END',
            ];


            // const tsplCommands = cms2.join('\r\n');
            const tsplCommands = this.cms;
            console.log("tsplCommands:", tsplCommands);
            const uint8Array = new TextEncoder('gb18030').encode(tsplCommands);
            console.log("uint8Array:", uint8Array);

            await this.characteristic.writeValueWithResponse(uint8Array);
            console.log("Printed successfully.");
        } catch (error) {
            console.error("Error during printing:", error);
        }
    }
}

customElements.define('bluetooth-printer', BluetoothPrinter);
