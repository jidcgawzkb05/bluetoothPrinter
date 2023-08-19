package com.company.barcodetest.view.material;

import com.company.barcodetest.entity.Material;

import com.company.barcodetest.view.main.MainView;

import com.vaadin.flow.router.Route;
import io.jmix.flowui.view.*;

@Route(value = "materials", layout = MainView.class)
@ViewController("Material.list")
@ViewDescriptor("material-list-view.xml")
@LookupComponent("materialsDataGrid")
@DialogMode(width = "64em")
public class MaterialListView extends StandardListView<Material> {
}