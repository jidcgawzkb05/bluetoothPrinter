package com.company.barcodetest.view.lot;

import com.company.barcodetest.entity.Lot;

import com.company.barcodetest.view.main.MainView;

import com.vaadin.flow.router.Route;
import io.jmix.flowui.view.*;

@Route(value = "lots/:id", layout = MainView.class)
@ViewController("Lot.detail")
@ViewDescriptor("lot-detail-view.xml")
@EditedEntityContainer("lotDc")
public class LotDetailView extends StandardDetailView<Lot> {
}