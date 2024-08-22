// components/pedidoCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Divider } from 'react-native-paper';

const pedidoCard = ({ pedido, detalles }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.titulo}>Pedido ID: {pedido.id_pedido}</Text>
        <Text style={styles.fecha}>Fecha: {pedido.fecha_registro}</Text>
        <Text style={styles.estado}>Estado: {pedido.estado_pedido}</Text>
        <Text style={styles.direccion}>Dirección: {pedido.direccion_pedido}</Text>
        <Divider style={styles.divider} />
        <Text style={styles.subtitulo}>Detalles del Pedido:</Text>
        {detalles.map((detalle) => (
          <View key={detalle.id_detalle} style={styles.detalle}>
            <Text>Producto: {detalle.id_producto}</Text>
            <Text>Cantidad: {detalle.cantidad_producto}</Text>
            <Text>Precio: ${detalle.precio_producto}</Text>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    backgroundColor: '#D7CCC8', // Café claro
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F00', // Naranja
  },
  fecha: {
    fontSize: 16,
    color: '#6D4C41', // Café oscuro
  },
  estado: {
    fontSize: 16,
    color: '#4E342E', // Café más oscuro
  },
  direccion: {
    fontSize: 14,
    color: '#4E342E',
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detalle: {
    marginBottom: 5,
  },
  divider: {
    marginVertical: 10,
  },
});

export default pedidoCard;
