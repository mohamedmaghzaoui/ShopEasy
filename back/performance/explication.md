# Optimisation des requêtes SQLite avec des index

## 1️⃣ Requête lente potentielle n°1

### Requête

```sql
SELECT u.UserId, FirstName, LastName, Email, Address, Phone
FROM Users u
LEFT JOIN Orders o ON u.UserId = o.UserId
WHERE o.OrderId IS NULL;
```
## Index proposé
```sql
CREATE INDEX idx_orders_userid ON Orders(UserId);
```

## Plan d’exécution avant index

![Texte alternatif](/before-index-users-request.png)

## Plan d’exécution après index
![Texte alternatif](/after-index-users-request.png)

## Explication de la différence

Avant : SQLite utilise un BLOOM FILTER pour simuler un index sur Orders.UserId. Cela nécessite de scanner la table Orders pour chaque utilisateur, ce qui est lent si la table est volumineuse.

Après : SQLite utilise directement l’index idx_orders_userid, ce qui permet de rechercher rapidement les commandes d’un utilisateur sans scanner toute la table.

Résultat : gain significatif de performance sur le LEFT JOIN.


# Requête lente potentielle n°2

```sql
SELECT p.ProductId, p.ProductName, SUM(od.Quantity) AS TotalVendu
FROM Products p
JOIN Order_Details od ON p.ProductId = od.ProductId
GROUP BY p.ProductId, p.ProductName
ORDER BY TotalVendu DESC
LIMIT 3;
```

```sql
CREATE INDEX idx_orderdetails_productid ON Order_Details(ProductId);
```


## Plan d’exécution avant index

![Texte alternatif](/before-index-products-request.png)

## Plan d’exécution après index
![Texte alternatif](/after-index-products-request.png)


## Explication de la différence

Avant index : SQLite lit toute la table Order_Details pour faire le JOIN et créer des structures temporaires pour le GROUP BY et ORDER BY → lent sur de grandes tables.

Après index (idx_orderdetails_productid) : SQLite utilise l’index pour retrouver directement les lignes correspondant à chaque produit → le JOIN est beaucoup plus rapide.
Résultat : la requête est beaucoup plus rapide sur des tables volumineuses car le JOIN est optimisé.
