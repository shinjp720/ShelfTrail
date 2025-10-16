---
title: SQL
layout: default
---

# SQL <a id="top" data-name="TOP"></a>

- SQLはデータベースを操作するための言語。

---

## SELECT文 <a id="select" data-name="SELECT文"></a>

### 記述順と実行順
SELECT文は記述する順番と実行される順番が違うので、意識すると処理の流れが見えてくる。

#### 記述順

1. SELECT
2. FROM
3. WHERE
4. GROUP BY
5. HAVING
6. ORDER BY
7. LIMIT

#### 実行順

1. FROM どのテーブルを使うかを決定。JOINもここで処理される。
2. WHERE 行を絞り込む(グループ化前のフィルタ)。
3. GROUP BY 指定した列でグループ化。
4. HAVING グループ化後の条件(集計結果に対して絞り込む)。
5. SELECT どの列、計算結果を取り出すかを決定。
6. ORDER BY 並び替えを行う。
7. LIMIT 取得する件数を制限。

### SELECT文の最小構成

```sql
-- 基本構文
SELECT カラム名1 [, カラム名2, ...]
FROM テーブル名;
```

<pre><code class="example">-- *で全てのカラムを取得する
SELECT *
FROM country;</code></pre>

### AS句
カラムに別名を付ける。

<pre><code class="example">SELECT continent, SUM(population) AS TotalPop</code></pre>

### WHERE句
条件を指定してデータを抽出する。

```sql
-- 基本構文
SELECT カラム名
FROM テーブル名
WHERE 条件式
```

#### 比較演算子

| 演算子 | 意味 |
| --- | --- |
| `=` | 等しい |
| `!=` または `<>` | 等しくない |
| `>` | 左辺は右辺より大きい |
| `>=` | 左辺は右辺以上 |
| `<` | 左辺は右辺より小さい |
| `<=` | 左辺は右辺以上 |

比較演算子は数値と文字列に対して利用でき、比較結果としてTRUE, FALSE, NULLの値を返す。<br> 
TRUE, FALSEにはそれぞれ定数1と0が割り当てられている。

#### 四則演算

| 演算子 | 意味 |
| --- | --- |
| `+` | 加算 |
| `-` | 減算 |
| `*` | 乗算 |
| `/` | 除算 |
| `DIV` | 除算(整数) |
| `%`または`MOD` | 剰余 |
