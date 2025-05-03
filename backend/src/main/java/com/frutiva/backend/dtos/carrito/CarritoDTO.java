package com.frutiva.backend.dtos.carrito;

import java.util.List;
import com.frutiva.backend.dtos.usuario.UsuarioAuxDTO;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarritoDTO {
    private Long id;
    private UsuarioAuxDTO usuario;
    private List<ItemCarritoDTO> items;
}
