---
title: SQL
layout: default
---

# SQL <a id="top" data-name="TOP"></a>

- SQLはデータベースを操作するための言語。

---

## SELECT文 <a id="select-sentence" data-name="SELECT文"></a>

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

### データ抽出の最小構成

```sql
-- 基本構文
SELECT カラム名1 [, カラム名2, ...]
FROM テーブル名;
```

---

### SELECT句 <a id="select" data-name="SELECT句"></a>

#### 全列取得
*で全列取得。

<pre><code class="example">SELECT *
FROM country;</code></pre>

#### AS
カラムに別名を付ける。

<pre><code class="example">SELECT continent, SUM(population) AS TotalPop</code></pre>

#### 集計関数

| 関数 | 説明 |
| --- | --- |
| AVG() | 平均値 |
| COUNT() | レコード数 |
| MAX() | 最大値 |
| MIN() | 最小値 |
| SUM() | 合計値 |

<pre><code class="caution">NULL値を含むレコードは無視されるので、AVG()とCOUNT()には注意が必要。
COUNT(*)とするとNULLも含めてカウントする。</code></pre>

#### 日付関数

<table>
    <tr><th>関数</th><th>説明</th></tr>
    <tr><td>NOW()またはCURRENT_TIMESTAMP()</td><td>現在の日時を取得</td></tr>
    <tr><td>CURDATE()またはCURRENT_DATE()</td><td>現在の日付けを取得</td></tr>
    <tr><td>CURTIME()またはCURRENT_TIME()</td><td>現在の時刻を取得</td></tr>
    <tr><td>YEAR(date)</td><td>dateから年を抽出</td></tr>
    <tr><td>MONTH(date)</td><td>dateから月を抽出</td></tr>
    <tr><td>DAY(date)</td><td>dateから日を抽出</td></tr>
    <tr><td>DATEDIFF(date1, date2)</td><td>日数の差を計算</td></tr>
    <tr><td>DATE_FORMAT(date, format)</td>
    <td>
        <table width="400px">
            <caption>日付を指定内容に基づいてフォーマットする</caption>
            <tr><td>%Y</td><td>年(4桁の数字)</td></tr>
            <tr><td>%y</td><td>年(2桁の数字)</td></tr>
            <tr><td>%b</td><td>月(jan...dac)</td></tr>
            <tr><td>%c</td><td>月(1...12)</td></tr>
            <tr><td>%m</td><td>月(01...12)</td></tr>
            <tr><td>%a</td><td>週(San..Sat)</td></tr>
            <tr><td>%d</td><td>日(01...31)</td></tr>
            <tr><td>%H</td><td>時(00...23)</td></tr>
            <tr><td>%h</td><td>時(91...12)</td></tr>
        </table>
        <pre><code class="example">SELECT DATE_FORMAT(now(), ‘%Y/%m/%d’)
-- 2014/10/30</code></pre>
        <pre><code class="example">SELECT DATE_FORMAT(rental_date, ‘%Y年%d月%d日’)
-- 2005年05月24日</code></pre>
    </td></tr>
    <tr><td>DATE_ADD(date, INTERVAL 期間)</td><td>dateに対して期間を加える<br>
        INTERVALにはYEAR, MONTH, DAY, HOUR, MINUTE, SECONDがある
        <pre><code class="example">SELECT DATE_ADD(now(), INTERVAL -10 DAY)</code></pre>
    </td></tr>
</table>

#### 数値関数

| 関数 | 説明 |
| --- | --- |
| ROUND(x) | xを四捨五入する |
| ROUND(x, n) | xを四捨五入して、nで表示する小数点以下の桁数を指定 |
| CEIL(x) | xを切り上げる |
| FLOOR(x) | xを切り捨てる |
| ABS(x) | xの絶対値 |

#### 文字列操作関数

| 関数 | 説明 |
| --- | --- |
| CONCAT(a, b) | 文字列を結合 |
| UPPER(str) | 小文字を大文字に変換 |
| LOWER(STR) | 大文字を小文字に変換 |
| SUBSTRING(str, start, len) | strのstartからlen文字取り出す(1オリジン) |
| SUBSTRING(str, start) | startから後ろを取り出す(1オリジン) |
| LENGTH(str) | 文字数 |

#### DISTINCT
重複を取り除いて取得

<pre><code class="example">SELECT DISTINCT continent</code></pre>

#### 列同士の演算
四則演算子などを用いて列同士の計算が可能。

<pre><code class="example">SELECT price, quantity, price * quantity AS total_price
FROM sales;</code></pre>

#### サブクエリ


#### CASE式


---

### WHERE句 <a id="WHERE" data-name="WHERE句"></a>
WHERE句で条件を指定してデータを抽出する。

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

#### 複数の条件で検索する

| 演算子 | 意味 |
| --- | --- |
| `&&`または`AND` | いずれも真 |
| `||`または`OR` | いずれかが真 |
| `!`または`NOT` | 否定 |
| 条件1`XOR`条件2 | 条件の一方のみが真の場合真 |

<pre><code class="example">SELECT * 
FROM city
WHERE CountryCode = 'JPN'
AND Population > 2000000;</code></pre>
CountryCodeが’JPN’かつPopulationが200万より大きい

#### あいまい検索
文字列の一部を任意の文字で検索する。

| 記号 | 意味 |
| --- | --- |
| `%` | 任意の文字列(0文字以上) |
| `_` | 任意の1文字(1文字のみ) |

```sql
WHERE カラム名 LIKE '文字列'
```

<pre><code class="example">SELECT *
FROM city
WHERE Name LIKE 'Tok%'</code></pre>

#### ある範囲の値を検索する

```sql
WHERE カラム名 BETWEEN 値1 AND 値2;
```

#### 値がリストに一致するレコードを検索する

```sql
WHERE カラム名 IN (値1, 値2, ...);
```

#### NULLのレコード

```sql
-- 値が空のレコード
WHERE カラム名 IS NULL;

-- 値が空ではないレコード
WHERE カラム名 IS NOT NULL;
```

---

### GROUP BY句 <a id="GROUP BY" data-name="GROUP BY句"></a>
GROUP BYは、同じ値を持つ行をまとめてグループ化し、集計関数などで集計を行うために用いる。

```sql
GROUP BY カラム名;
```

<pre><code class="example">SELECT continent, AVG(population)
FROM country
GROUP BY continent</code></pre>
大陸ごとの人口の平均。

<pre><code class="caution">GROUP BYを使う際は、SELECT句にはGROUP BYに含まれる列か、集計関数しか書けない</code></pre>

#### 複数列のグループ化

<pre><code class="example">SELECT YEAR(order_date) AS year, MONTH(order_date) AS month, SUM(amount) AS total
FROM sales
GROUP BY YEAR(order_date), MONTH(order_date);</code></pre>
〇年〇月ごとに合計を抽出。

---

### HAVING句 <a id="HAVING" data-name="HAVING句"></a>




---

### ORDER BY句 <a id="ORDERY BY" data-name="ORDER BY句"></a>
SELECT文の結果を並び替える。

```sql
-- 基本構文
ORDER BY カラム名 [ASC | DESC];
```
デフォルトでASC(昇順)となっているので、降順にしたい場合はDESCを指定する。

#### 複数の条件で並び替え

<pre><code class="example">SELECT name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;</code></pre>

1. 部署ごとに昇順で並び替え。
2. 同じ部署で給料(salary)が高い順に並び替え。

---

### LIMIT句 <a id="LIMIT" data-name="LIMIT句"></a>
取得上限数を指定する。

```cpp
LIMIT [開始位置,] 件数;
```

