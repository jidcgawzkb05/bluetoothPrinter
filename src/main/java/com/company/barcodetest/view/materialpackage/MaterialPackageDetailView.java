package com.company.barcodetest.view.materialpackage;

import com.company.barcodetest.entity.MaterialPackage;

import com.company.barcodetest.view.main.MainView;

import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.dependency.JavaScript;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import io.jmix.flowui.kit.component.button.JmixButton;
import io.jmix.flowui.view.*;

import com.vaadin.flow.component.Html;



@Route(value = "materialPackages/:id", layout = MainView.class)
@ViewController("MaterialPackage.detail")
@ViewDescriptor("material-package-detail-view.xml")
//@JsModule("./mui.min.js")
//@CssImport("./mui.min.css")
//@JavaScript( "./barcodePrint.js")
@EditedEntityContainer("materialPackageDc")
public class MaterialPackageDetailView extends StandardDetailView<MaterialPackage> {
    @ViewComponent
    private Div testDiv;

    @Subscribe("barcodePrint")
    public void onBarcodePrintClick(final ClickEvent<JmixButton> event) {

        Html html1 = new Html("<div>"
                + "  <ul id=\"list1\"></ul> "
                + "  <ul id=\"list2\"></ul> "
                + " </div>"
        );
        testDiv.add(html1);
////
//        Button button1 = new Button("搜索设备");
//        button1.setId("bt1");
//        button1.addClickListener(event1 -> {
            UI.getCurrent().getElement().callJsFunction("searchDevices","a");
//        });


//        UI.getCurrent().getElement().callJsFunction()

    }
}