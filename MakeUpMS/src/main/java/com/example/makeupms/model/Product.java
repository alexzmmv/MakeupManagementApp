package com.example.makeupms.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String category;
    //High-end, Drugstore, Indie,Uncategorized
    private String type;
    //Skincare, Makeup, Fragrance
    private String brand;

    public Product() {
    }

    public String toString() {
        return "Product{" +
                "id=" + id +
                ", category='" + category + '\'' +
                ", type='" + type + '\'' +
                ", brand='" + brand + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", quantity=" + quantity +
                ", isOpened=" + isOpened +
                ", expirationDate=" + expirationDate +
                ", purchaseDate=" + purchaseDate +
                ", openDate=" + openDate +
                ", openDuration=" + openDuration +
                ", price=" + price +
                ", notes='" + notes + '\'' +
                '}';
    }
    @Column
    private String name;

    @Column
    private String description;
    private Integer quantity;
    private Boolean isOpened;

    public Product(String name, String brand, Float price) {
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.isOpened = false;
        this.quantity = 1;
        //current date
        this.purchaseDate = new Date();
        this.openDate = null;
        this.openDuration = null;
        this.notes = "";
        this.expirationDate = null;
        this.category = "Uncategorized";
        this.type = "Uncategorized";
        this.description = "";
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }


    public Date getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public Date getOpenDate() {
        return openDate;
    }

    public void setOpenDate(Date openDate) {
        this.openDate = openDate;
    }

    public Integer getOpenDuration() {
        return openDuration;
    }

    public void setOpenDuration(Integer openDuration) {
        this.openDuration = openDuration;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    private Date expirationDate;
    private Date purchaseDate;
    private Date openDate;
    private Integer openDuration;
    private Float price;
    private String notes;


    public Product(String category, String type, String brand, String name, String description, Integer quantity, Boolean isOpened, Date expirationDate, Date purchaseDate, Date openDate, Integer openDuration, Float price, String notes) {
        this.category = category;
        this.type = type;
        this.brand = brand;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.isOpened = isOpened; // Corrected parameter name
        this.expirationDate = expirationDate;
        this.purchaseDate = purchaseDate;
        this.openDate = openDate;
        this.openDuration = openDuration;
        this.price = price;
        this.notes = notes;
    }



    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Boolean getIsOpened() {
        return isOpened;
    }
    public void setIsOpened(Boolean isOpened) {
        this.isOpened = isOpened;
    }
}
