package com.frutiva.backend.dtos.carrito;

import com.frutiva.backend.dtos.producto.ProductoDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemCarritoDTO {
    private Long id;
    private ProductoDTO producto;
    private int cantidad;
}
