import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import PedidoCard from '../components/cards/pedidoCard.js';

const pedidos = [
  {
    id_pedido: 1,
    fecha_registro: '2024-08-01',
    estado_pedido: 'Pendiente',
    direccion_pedido: '123 Calle Principal',
    detalles: [
      { id_detalle: 1, id_producto: 101, cantidad_producto: 2, precio_producto: 10.00 },
      { id_detalle: 2, id_producto: 102, cantidad_producto: 1, precio_producto: 20.00 },
    ],
  },
  // Agrega más pedidos aquí
  {
    id_pedido: 2,
    fecha_registro: '2024-08-07',
    estado_pedido: 'Entregado',
    direccion_pedido: '123 Calle Principal',
    detalles: [
      { id_detalle: 1, id_producto: 101, cantidad_producto: 2, precio_producto: 10.00 },
      { id_detalle: 2, id_producto: 102, cantidad_producto: 1, precio_producto: 20.00 },
    ],
  },
];
const carrito = () => {
  return (
    <SafeAreaView style={{ flex: 1, padding: 10, marginTop: 30, backgroundColor: '#FFF3E0' }}>
      <FlatList
        data={pedidos}
        renderItem={({ item }) => (
          <PedidoCard
            pedido={item}
            detalles={item.detalles}
          />
        )}
        keyExtractor={(item) => item.id_pedido.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0', // Color de fondo en tono naranja claro
    padding: 10,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#D7CCC8', // Color de fondo de la tarjeta en tono café claro
  },
  fecha: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6F00', // Color naranja
  },
  total: {
    fontSize: 14,
    color: '#6D4C41', // Color café oscuro
  },
  detalles: {
    fontSize: 12,
    color: '#4E342E', // Color café más oscuro
  },
});

export default carrito