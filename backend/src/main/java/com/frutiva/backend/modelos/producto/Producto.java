package com.frutiva.backend.modelos.producto;

import java.time.LocalDate;

import com.frutiva.backend.modelos.usuario.Usuario;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String marca;

    @Column
    private String modelo;

    @Column
    private String categoria;

    @ManyToOne
    @JoinColumn(name = "vendedor", nullable = false)
    private Usuario vendedor;

    @Column(nullable = false)
    private Long stock;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column
    private double pesoNeto;    

    @Column
    private double pesoBruto;   

    @Column
    private double largo;       

    @Column
    private double ancho;     

    @Column
    private double alto;    

    @Column
    private String color;

    @Column
    private String material;

    @Column
    private LocalDate fechaFabricacion;

    @Column
    private LocalDate fechaCaducidad;

    @Column
    private String origen;       

    @Column
    private String proveedor;      
    
    @Column
    private Integer garantia;    
    
    @Column(nullable = false)
    private double precioUnitario;

    @Column(nullable = false)
    private int cantidadMinima;

    @Column(nullable = false)
    private double precioPorMayor;

    @Column
    private Integer unidadesPorPaquete;  

    @Column
    private String tipoEmpaque;  
    @Column
    private String numeroLote;       

    @Column
    private Integer descuentoPorcentaje; 

}
