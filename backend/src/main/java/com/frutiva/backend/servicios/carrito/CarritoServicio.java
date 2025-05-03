// servicios/carrito/CarritoServicio.java
package com.frutiva.backend.servicios.carrito;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.frutiva.backend.dtos.carrito.CarritoDTO;
import com.frutiva.backend.dtos.carrito.ItemCarritoDTO;
import com.frutiva.backend.dtos.producto.ProductoDTO;
import com.frutiva.backend.dtos.usuario.UsuarioAuxDTO;
import com.frutiva.backend.modelos.carrito.Carrito;
import com.frutiva.backend.modelos.carrito.ItemCarrito;
import com.frutiva.backend.modelos.producto.Producto;
import com.frutiva.backend.modelos.usuario.Usuario;
import com.frutiva.backend.repositorios.carrito.CarritoRepositorio;
import com.frutiva.backend.repositorios.carrito.ItemCarritoRepositorio;
import com.frutiva.backend.repositorios.producto.ProductoRepositorio;
import com.frutiva.backend.repositorios.usuario.UsuarioRepositorio;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CarritoServicio {

    private final CarritoRepositorio carritoRepo;
    private final ItemCarritoRepositorio itemRepo;
    private final UsuarioRepositorio usuarioRepo;
    private final ProductoRepositorio productoRepo;
    private final ModelMapper mapper = new ModelMapper();

    public List<CarritoDTO> listarTodos() {
        return carritoRepo.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public Optional<CarritoDTO> obtenerPorId(Long id) {
        return carritoRepo.findById(id)
                .map(this::toDto);
    }

    public CarritoDTO crear(CarritoDTO dto) {
        Long userId = dto.getUsuario().getId();
        Usuario u = usuarioRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no existe"));
        Carrito c = new Carrito();
        c.setUsuario(u);
        c.setItems(List.of());
        carritoRepo.save(c);
        return toDto(c);
    }

    public Optional<CarritoDTO> actualizar(Long id, CarritoDTO dto) {
        return carritoRepo.findById(id).map(c -> {
            Long userId = dto.getUsuario().getId();
            Usuario u = usuarioRepo.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("Usuario no existe"));
            c.setUsuario(u);
            c.getItems().clear();
            dto.getItems().forEach(itemDto -> {
                Long prodId = itemDto.getProducto().getId();
                Producto p = productoRepo.findById(prodId)
                        .orElseThrow(() -> new IllegalArgumentException("Producto no existe"));
                ItemCarrito ic = new ItemCarrito();
                ic.setCantidad(itemDto.getCantidad());
                ic.setProducto(p);
                ic.setCarrito(c);
                c.getItems().add(ic);
            });
            carritoRepo.save(c);
            return toDto(c);
        });
    }

    public void eliminar(Long id) {
        carritoRepo.deleteById(id);
    }

    public ItemCarritoDTO addItem(Long carritoId, ItemCarritoDTO dto) {
        Carrito c = carritoRepo.findById(carritoId)
                .orElseThrow(() -> new IllegalArgumentException("Carrito no existe"));
        Long prodId = dto.getProducto().getId();
        Producto p = productoRepo.findById(prodId)
                .orElseThrow(() -> new IllegalArgumentException("Producto no existe"));
        ItemCarrito ic = new ItemCarrito();
        ic.setProducto(p);
        ic.setCantidad(dto.getCantidad());
        ic.setCarrito(c);
        itemRepo.save(ic);
        c.getItems().add(ic);
        carritoRepo.save(c);
        return toDto(ic);
    }

    public void removeItem(Long carritoId, Long itemId) {
        Carrito c = carritoRepo.findById(carritoId)
                .orElseThrow(() -> new IllegalArgumentException("Carrito no existe"));
        ItemCarrito ic = itemRepo.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Item no existe"));
        if (!ic.getCarrito().getId().equals(carritoId)) {
            throw new IllegalArgumentException("El item no pertenece a este carrito");
        }
        c.getItems().remove(ic);
        itemRepo.delete(ic);
    }

    // ——— Conversores ———

    private CarritoDTO toDto(Carrito c) {
        CarritoDTO dto = mapper.map(c, CarritoDTO.class);

        UsuarioAuxDTO ua = new UsuarioAuxDTO();
        ua.setId(c.getUsuario().getId());
        ua.setNombre(c.getUsuario().getNombre());
        ua.setApellido(c.getUsuario().getApellido());
        ua.setCorreo(c.getUsuario().getCorreo());
        ua.setEdad(c.getUsuario().getEdad());
        dto.setUsuario(ua);

        dto.setItems(c.getItems().stream()
                .map(this::toDto)
                .collect(Collectors.toList()));
        return dto;
    }

    private ItemCarritoDTO toDto(ItemCarrito ic) {
        Producto producto = ic.getProducto();
        ProductoDTO productoDTO = mapper.map(producto, ProductoDTO.class);
        productoDTO.setVendedor(mapper.map(producto.getVendedor(), UsuarioAuxDTO.class));

        return new ItemCarritoDTO(
                ic.getId(),
                productoDTO,
                ic.getCantidad()
        );
    }
}
