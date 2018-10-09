package model;

import java.util.Date;

public class Transaction {
	
	private Date date;
	private int units;
	private String ticker;
	private double price;
	
	public Transaction(Date date, int units, String ticker, double price) {
		super();
		this.date = date;
		this.units = units;
		this.ticker = ticker;
		this.price = price;
	}
	
	public Date getDate() {
		return date;
	}

	public int getUnits() {
		return units;
	}

	public String getTicker() {
		return ticker;
	}

	public double getPrice() {
		return price;
	}

}
