import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase";
import "./PlansScreen.css";
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);
  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot);
        const products = [];
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);
  // console.log(products);
  // console.log(subscription?.role);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        //show an error to your customer and
        //inspect your cloud Function logs in the Firebase console
        alert(`An error occurred : ${error.message}`);
      }
      if (sessionId) {
        //we have a session, lets redirect to checkout
        //init stripe
        const stripe = await loadStripe(
          "pk_test_51LZTJ8SJX0gVg8ldYKeAHhX8BkODhwisoRJaCd9iLyqL7N8KDYXNizmdz0EXnM1DCLfQiBSe3wNdmNfvdyARKPtY00XMe3Cp5K"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="planScreen">
      <h3>Plans(Current Plan: {subscription?.role})</h3>
      <br />
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        //add some logic to check if the user's subscription is active
        const isCurrentPackage = productData.name?.includes(subscription?.role);
        console.log(user.uid);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plansScreen__plans--disabled"
            } plansScreen__plans`}
          >
            <div className="plansScreen__info">
              <h5> {productData?.name}</h5>
              <h6>{productData?.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData?.prices?.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
