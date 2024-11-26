package com.inventario.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "desc", nullable = false)
    private String description;

    @Column(name = "stock", nullable = false)
    private int stock;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "image", nullable = false)
    private String image; // Campo agregado

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter y Setter para name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter y Setter para description
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Getter y Setter para stock
    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    // Getter y Setter para price
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    // Getter y Setter para category
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    // Getter y Setter para image
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
