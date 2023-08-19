package com.company.barcodetest.view.lot;

import com.company.barcodetest.entity.Lot;

import com.company.barcodetest.view.main.MainView;

import com.vaadin.flow.router.Route;
import io.jmix.flowui.view.*;

@Route(value = "lots", layout = MainView.class)
@ViewController("Lot.list")
@ViewDescriptor("lot-list-view.xml")
@LookupComponent("lotsDataGrid")
@DialogMode(width = "64em")
public class LotListView extends StandardListView<Lot> {
}