package com.company.barcodetest.view.material;

import com.company.barcodetest.entity.Material;

import com.company.barcodetest.view.main.MainView;

import com.vaadin.flow.router.Route;
import io.jmix.flowui.view.*;

@Route(value = "materials/:id", layout = MainView.class)
@ViewController("Material.detail")
@ViewDescriptor("material-detail-view.xml")
@EditedEntityContainer("materialDc")
public class MaterialDetailView extends StandardDetailView<Material> {
}