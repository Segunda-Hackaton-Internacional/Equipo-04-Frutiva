package com.frutiva.backend.modelos.pedido;

import com.frutiva.backend.modelos.usuario.Usuario;
import com.frutiva.backend.modelos.producto.Producto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "comprador_id")
    private Usuario comprador;

    @ManyToOne(optional = false)
    @JoinColumn(name = "vendedor_id")
    private Usuario vendedor;

    @ManyToOne(optional = false)
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @Column(nullable = false)
    private int cantidad;
}
