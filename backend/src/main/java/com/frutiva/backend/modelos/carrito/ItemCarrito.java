package com.frutiva.backend.modelos.carrito;

import com.frutiva.backend.modelos.producto.Producto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ItemCarrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    @Column(nullable = false)
    private int cantidad;

    @ManyToOne
    @JoinColumn(name = "carrito_id")
    private Carrito carrito;
}
