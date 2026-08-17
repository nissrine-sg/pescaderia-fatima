CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`description` text NOT NULL,
	`price` text NOT NULL,
	`image` text NOT NULL,
	`storage` text NOT NULL,
	`preparation` text NOT NULL,
	`status` text DEFAULT 'Disponible' NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `products` (`name`, `type`, `description`, `price`, `image`, `storage`, `preparation`, `status`, `position`) VALUES
('Dorada', 'Pescado entero', 'Carne fina y delicada, ideal al horno o a la plancha.', '14,90 €/kg', 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=900&q=85', 'Fresco', 'Entera · Fileteada', 'Disponible', 0),
('Salmón', 'Lomo y filete', 'Textura suave, cortado al momento según tus preferencias.', '22,90 €/kg', 'https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?auto=format&fit=crop&w=900&q=85', 'Fresco / Congelado', 'Lomo · Filete', 'Disponible', 1),
('Sardinas', 'Pesca del día', 'Brillantes, carnosas y sabrosas, perfectas a la parrilla.', '7,90 €/kg', 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=900&q=85', 'Fresco', 'Enteras', 'Últimas unidades', 2),
('Merluza', 'Pescado entero', 'Carne blanca, tierna y ligera para toda la familia.', '12,90 €/kg', 'https://images.unsplash.com/photo-1498623116890-37e912163d5d?auto=format&fit=crop&w=900&q=85', 'Fresco', 'Entera · Fileteada', 'Disponible', 3),
('Gambas', 'Marisco', 'Seleccionadas con cuidado, firmes y llenas de sabor marino.', '18,90 €/kg', 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=85', 'Fresco / Congelado', '250 g · 500 g · 1 kg', 'Disponible', 4),
('Calamar', 'Preparado al momento', 'Limpio y listo para cocinar, tierno a la sartén o a la parrilla.', '16,90 €/kg', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85', 'Fresco', 'Entero · Limpio', 'Disponible', 5),
('Pescado blanco', 'Filete del día', 'Nuestra selección diaria: suave, ligera y sin espinas.', '13,90 €/kg', 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=85', 'Fresco', 'Filete', 'Disponible', 6);
