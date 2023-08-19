package com.company.barcodetest.view.materialpackage;

import com.company.barcodetest.entity.MaterialPackage;

import com.company.barcodetest.view.main.MainView;

import com.vaadin.flow.router.Route;
import io.jmix.flowui.view.*;

@Route(value = "materialPackages", layout = MainView.class)
@ViewController("MaterialPackage.list")
@ViewDescriptor("material-package-list-view.xml")
@LookupComponent("materialPackagesDataGrid")
@DialogMode(width = "64em")
public class MaterialPackageListView extends StandardListView<MaterialPackage> {
}