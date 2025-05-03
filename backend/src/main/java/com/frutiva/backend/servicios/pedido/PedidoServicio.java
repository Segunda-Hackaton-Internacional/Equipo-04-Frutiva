// servicios/pedido/PedidoServicio.java
package com.frutiva.backend.servicios.pedido;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.frutiva.backend.dtos.pedido.PedidoDTO;
import com.frutiva.backend.dtos.producto.ProductoDTO;
import com.frutiva.backend.dtos.usuario.UsuarioAuxDTO;
import com.frutiva.backend.modelos.pedido.Pedido;
import com.frutiva.backend.modelos.producto.Producto;
import com.frutiva.backend.modelos.usuario.Usuario;
import com.frutiva.backend.repositorios.pedido.PedidoRepositorio;
import com.frutiva.backend.repositorios.producto.ProductoRepositorio;
import com.frutiva.backend.repositorios.usuario.UsuarioRepositorio;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PedidoServicio {

    private final PedidoRepositorio pedidoRepo;
    private final UsuarioRepositorio usuarioRepo;
    private final ProductoRepositorio productoRepo;
    private final ModelMapper mapper = new ModelMapper();

    public List<PedidoDTO> listarTodos() {
        return pedidoRepo.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public Optional<PedidoDTO> obtenerPorId(Long id) {
        return pedidoRepo.findById(id)
                .map(this::toDto);
    }

    public PedidoDTO crear(PedidoDTO dto) {
        Pedido entidad = new Pedido();
        // validar y asignar comprador
        Long compradorId = dto.getComprador().getId();
        Usuario comprador = usuarioRepo.findById(compradorId)
                .orElseThrow(() -> new IllegalArgumentException("Comprador no existe"));
        entidad.setComprador(comprador);
        // validar y asignar vendedor
        Long vendedorId = dto.getVendedor().getId();
        Usuario vendedor = usuarioRepo.findById(vendedorId)
                .orElseThrow(() -> new IllegalArgumentException("Vendedor no existe"));
        entidad.setVendedor(vendedor);
        // validar y asignar producto
        Long productoId = dto.getProducto().getId();
        Producto producto = productoRepo.findById(productoId)
                .orElseThrow(() -> new IllegalArgumentException("Producto no existe"));
        entidad.setProducto(producto);
        // cantidad
        entidad.setCantidad(dto.getCantidad());

        Pedido guardado = pedidoRepo.save(entidad);
        return toDto(guardado);
    }

    public Optional<PedidoDTO> actualizar(Long id, PedidoDTO dto) {
        return pedidoRepo.findById(id).map(entidad -> {
            // actualizar comprador
            Long compradorId = dto.getComprador().getId();
            Usuario comprador = usuarioRepo.findById(compradorId)
                    .orElseThrow(() -> new IllegalArgumentException("Comprador no existe"));
            entidad.setComprador(comprador);
            // actualizar vendedor
            Long vendedorId = dto.getVendedor().getId();
            Usuario vendedor = usuarioRepo.findById(vendedorId)
                    .orElseThrow(() -> new IllegalArgumentException("Vendedor no existe"));
            entidad.setVendedor(vendedor);
            // actualizar producto
            Long productoId = dto.getProducto().getId();
            Producto producto = productoRepo.findById(productoId)
                    .orElseThrow(() -> new IllegalArgumentException("Producto no existe"));
            entidad.setProducto(producto);
            // actualizar cantidad
            entidad.setCantidad(dto.getCantidad());

            Pedido actualizado = pedidoRepo.save(entidad);
            return toDto(actualizado);
        });
    }

    public void eliminar(Long id) {
        pedidoRepo.deleteById(id);
    }

    private PedidoDTO toDto(Pedido pedido) {
        // mapea datos sencillos
        PedidoDTO dto = mapper.map(pedido, PedidoDTO.class);

        // mapea comprador
        UsuarioAuxDTO uComprador = new UsuarioAuxDTO();
        uComprador.setId(pedido.getComprador().getId());
        uComprador.setNombre(pedido.getComprador().getNombre());
        uComprador.setApellido(pedido.getComprador().getApellido());
        uComprador.setCorreo(pedido.getComprador().getCorreo());
        uComprador.setEdad(pedido.getComprador().getEdad());
        dto.setComprador(uComprador);

        // mapea vendedor
        UsuarioAuxDTO uVendedor = new UsuarioAuxDTO();
        uVendedor.setId(pedido.getVendedor().getId());
        uVendedor.setNombre(pedido.getVendedor().getNombre());
        uVendedor.setApellido(pedido.getVendedor().getApellido());
        uVendedor.setCorreo(pedido.getVendedor().getCorreo());
        uVendedor.setEdad(pedido.getVendedor().getEdad());
        dto.setVendedor(uVendedor);

        // mapea producto
        ProductoDTO pDto = mapper.map(pedido.getProducto(), ProductoDTO.class);
        // anida al vendedor del producto también como AuxDTO
        UsuarioAuxDTO prodVendedor = new UsuarioAuxDTO();
        prodVendedor.setId(pedido.getProducto().getVendedor().getId());
        prodVendedor.setNombre(pedido.getProducto().getVendedor().getNombre());
        prodVendedor.setApellido(pedido.getProducto().getVendedor().getApellido());
        prodVendedor.setCorreo(pedido.getProducto().getVendedor().getCorreo());
        prodVendedor.setEdad(pedido.getProducto().getVendedor().getEdad());
        pDto.setVendedor(prodVendedor);
        dto.setProducto(pDto);

        return dto;
    }
}
