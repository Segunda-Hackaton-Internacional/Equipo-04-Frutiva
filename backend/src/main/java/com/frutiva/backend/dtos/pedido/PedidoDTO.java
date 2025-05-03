package com.frutiva.backend.dtos.pedido;

import com.frutiva.backend.dtos.usuario.UsuarioAuxDTO;
import com.frutiva.backend.dtos.producto.ProductoDTO;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedidoDTO {
    private Long id;
    private UsuarioAuxDTO comprador;
    private UsuarioAuxDTO vendedor;
    private ProductoDTO producto;
    private int cantidad;
}
