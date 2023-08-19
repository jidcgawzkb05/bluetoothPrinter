package com.company.barcodetest.view;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.html.Div;
import elemental.json.Json;
import elemental.json.JsonArray;

import java.io.Serializable;
import java.util.Arrays;

@Tag("bluetooth-printer")
@JsModule("./bluetooth-printer.js")
public class BluetoothPrinterView extends Component {

    public BluetoothPrinterView() {

    }
    public void print(String cms) {
        getElement().setProperty("cms", cms);
        getElement().callJsFunction("connectOrPrint");
    }
}
